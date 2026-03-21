import { useState, useEffect } from 'react';
import { Search, User, Mail, Shield, MoreHorizontal, Check, X } from 'lucide-react';
import api from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}`, { role: newRole });
      fetchUsers();
    } catch (err) {
      console.error('Error updating user role:', err);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await api.put(`/admin/users/${userId}`, { isActive: !currentStatus });
      fetchUsers();
    } catch (err) {
      console.error('Error toggling user status:', err);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="animate-pulse">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h1>
        <div className="relative w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3 font-semibold text-sm focus:border-[#00b67a] focus:ring-4 focus:ring-[#00b67a]/5 outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">User</th>
              <th className="text-left px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
              <th className="text-left px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Role</th>
              <th className="text-left px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Created</th>
              <th className="text-right px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#00b67a] font-bold">
                      {user.name[0]}
                    </div>
                    <p className="font-bold text-gray-900">{user.name}</p>
                  </div>
                </td>
                <td className="px-8 py-5 font-semibold text-gray-500">{user.email}</td>
                <td className="px-8 py-5">
                  <span className={`
                    px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 
                      user.role === 'companyOwner' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-semibold text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <select 
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      value={user.role}
                      className="bg-gray-100 border-none rounded-lg text-[10px] font-bold uppercase px-2 py-1 outline-none cursor-pointer"
                    >
                      <option value="user">User</option>
                      <option value="companyOwner">Owner</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button 
                      onClick={() => handleToggleStatus(user._id, user.isActive)}
                      className={`
                        px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all
                        ${user.isActive ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-green-50 text-green-500 hover:bg-green-500 hover:text-white'}
                      `}
                    >
                      {user.isActive ? 'Ban' : 'Unban'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
