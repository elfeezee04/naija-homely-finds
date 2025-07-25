import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Home as HomeIcon, 
  TrendingUp, 
  DollarSign,
  Search,
  Eye,
  Check,
  X,
  MoreVertical,
  Filter,
  Download,
  LogOut,
  Plus,
  UserPlus
} from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import PropertyForm from '@/components/PropertyForm';
import AgentForm from '@/components/AgentForm';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check admin auth
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch properties and users from database
  useEffect(() => {
    fetchProperties();
    fetchUsers();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to fetch properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setUsersLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  // Calculate stats from real data
  const stats = [
    {
      title: 'Total Properties',
      value: properties.length.toString(),
      change: '+12%',
      icon: HomeIcon,
      color: 'text-blue-600',
    },
    {
      title: 'Active Properties',
      value: properties.filter(p => p.status === 'active').length.toString(),
      change: '+8%',
      icon: Users,
      color: 'text-green-600',
    },
    {
      title: 'Total Value',
      value: `₦${(properties.reduce((sum, p) => sum + (p.price || 0), 0) / 1000000).toFixed(1)}M`,
      change: '+15%',
      icon: DollarSign,
      color: 'text-yellow-600',
    },
    {
      title: 'Pending Review',
      value: properties.filter(p => p.status === 'pending' || !p.status).length.toString(),
      change: '+5%',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
  ];

  const pendingProperties = properties.filter(p => p.status === 'pending' || !p.status);

  const handleApproveProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: 'active' })
        .eq('id', propertyId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Property approved successfully",
      });
      
      fetchProperties();
    } catch (error) {
      console.error('Error approving property:', error);
      toast({
        title: "Error",
        description: "Failed to approve property",
        variant: "destructive",
      });
    }
  };

  const handleRejectProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: 'rejected' })
        .eq('id', propertyId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Property rejected",
      });
      
      fetchProperties();
    } catch (error) {
      console.error('Error rejecting property:', error);
      toast({
        title: "Error",
        description: "Failed to reject property",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
      
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    }
  };

  const handleAddProperty = async (propertyData: any) => {
    try {
      const { error } = await supabase
        .from('properties')
        .insert([{
          ...propertyData,
          status: 'active',
          user_id: '00000000-0000-0000-0000-000000000000' // Admin created property
        }]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Property added successfully",
      });
      
      setIsAddPropertyOpen(false);
      fetchProperties();
    } catch (error) {
      console.error('Error adding property:', error);
      toast({
        title: "Error",
        description: "Failed to add property",
        variant: "destructive",
      });
    }
  };

  const handleAddAgent = async (agentData: any) => {
    try {
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: agentData.email,
        password: agentData.password,
        email_confirm: true
      });

      if (authError) throw authError;

      // Then create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          user_id: authData.user.id,
          full_name: agentData.full_name,
          phone: agentData.phone,
          role: 'agent'
        }]);

      if (profileError) throw profileError;
      
      toast({
        title: "Success",
        description: "Agent added successfully",
      });
      
      setIsAddAgentOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error adding agent:', error);
      toast({
        title: "Error",
        description: "Failed to add agent. " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleUserAction = async (userId: string, action: string) => {
    if (action === 'approve') {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ role: 'agent' })
          .eq('id', userId);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "User approved as agent",
        });
        
        fetchUsers();
      } catch (error) {
        console.error('Error approving user:', error);
        toast({
          title: "Error",
          description: "Failed to approve user",
          variant: "destructive",
        });
      }
    } else if (action === 'delete') {
      if (!confirm('Are you sure you want to delete this user?')) return;
      
      try {
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', userId);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
        
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast({
          title: "Error",
          description: "Failed to delete user",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage properties, users, and platform analytics
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-600">{stat.change}</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Property Approvals</CardTitle>
                  <CardDescription>
                    Properties waiting for admin review
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="text-center py-4">Loading properties...</div>
                  ) : pendingProperties.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No pending properties
                    </div>
                  ) : (
                    pendingProperties.slice(0, 3).map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{property.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {property.location} • ₦{property.price?.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleApproveProperty(property.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectProperty(property.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                  <CardDescription>
                    New users who joined the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {users.slice(0, 3).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{user.full_name || 'No name'}</h4>
                        <p className="text-xs text-muted-foreground">
                          {user.role} • Joined {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {user.role}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    className="pl-10 w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Dialog open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Property
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <PropertyForm onSubmit={handleAddProperty} />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-8">Loading properties...</div>
              ) : properties.length === 0 ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No properties found
                </div>
              ) : (
                properties
                  .filter(property => {
                    const matchesSearch = searchTerm === '' || 
                      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      property.location?.toLowerCase().includes(searchTerm.toLowerCase());
                    
                    const matchesStatus = statusFilter === 'all' || 
                      (statusFilter === 'pending' && (!property.status || property.status === 'pending')) ||
                      property.status === statusFilter;
                    
                    return matchesSearch && matchesStatus;
                  })
                  .map((property) => (
                    <div key={property.id} className="relative">
                      <PropertyCard property={{
                        ...property,
                        images: property.images || ['/placeholder.svg'],
                        agent: { name: 'Property Owner', phone: '+234 000 000 0000' }
                      }} />
                      <div className="absolute top-2 right-2 flex gap-2">
                        {property.status !== 'active' && (
                          <Button size="sm" variant="default" onClick={() => handleApproveProperty(property.id)}>
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        {property.status !== 'rejected' && (
                          <Button size="sm" variant="destructive" onClick={() => handleRejectProperty(property.id)}>
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleDeleteProperty(property.id)}>
                          Delete
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge variant={
                          property.status === 'active' ? 'default' :
                          property.status === 'rejected' ? 'destructive' : 'secondary'
                        }>
                          {property.status || 'pending'}
                        </Badge>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Agent
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <AgentForm onSubmit={handleAddAgent} />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Users
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage registered users and their permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usersLoading ? (
                    <div className="text-center py-4">Loading users...</div>
                  ) : users.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No users found
                    </div>
                  ) : (
                     users.map((user) => (
                     <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                       <div className="flex-1">
                         <div className="flex items-center gap-4">
                           <div>
                             <h4 className="font-medium">{user.full_name || 'No name'}</h4>
                             <p className="text-sm text-muted-foreground">{user.user_id}</p>
                           </div>
                           <Badge variant="secondary">{user.role}</Badge>
                         </div>
                         <div className="text-sm text-muted-foreground mt-2">
                           Joined: {new Date(user.created_at).toLocaleDateString()}
                           {user.phone && ` • Phone: ${user.phone}`}
                         </div>
                       </div>
                       <div className="flex gap-2">
                         {user.role === 'user' && (
                           <Button 
                             size="sm" 
                             variant="default"
                             onClick={() => handleUserAction(user.id, 'approve')}
                           >
                             Make Agent
                           </Button>
                         )}
                         <Button 
                           size="sm" 
                           variant="outline"
                           onClick={() => handleUserAction(user.id, 'view')}
                         >
                           <Eye className="h-3 w-3" />
                         </Button>
                         <Button 
                           size="sm" 
                           variant="destructive"
                           onClick={() => handleUserAction(user.id, 'delete')}
                         >
                           Delete
                         </Button>
                       </div>
                     </div>
                     ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Analytics</CardTitle>
                  <CardDescription>
                    Property listing and engagement statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Properties</span>
                      <span className="font-medium">{properties.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Listings</span>
                      <span className="font-medium">{properties.filter(p => p.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pending Approval</span>
                      <span className="font-medium">{properties.filter(p => p.status === 'pending' || !p.status).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">For Rent</span>
                      <span className="font-medium">{properties.filter(p => p.listing_type === 'rent').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">For Sale</span>
                      <span className="font-medium">{properties.filter(p => p.listing_type === 'sale').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Sold Properties</span>
                      <span className="font-medium">{properties.filter(p => p.status === 'sold').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Analytics</CardTitle>
                  <CardDescription>
                    User registration and activity statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Users</span>
                      <span className="font-medium">{users.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Agents</span>
                      <span className="font-medium">{users.filter(u => u.role === 'agent').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Regular Users</span>
                      <span className="font-medium">{users.filter(u => u.role === 'user').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Admins</span>
                      <span className="font-medium">{users.filter(u => u.role === 'admin').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;