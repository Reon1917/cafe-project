// app/admin/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get token from local storage or session
    const savedToken = localStorage.getItem('adminToken');
    if (!savedToken) {
      router.push('/login'); // Redirect to login if no token
    }
    setToken(savedToken);
  }, []);

  const fetchMenuItems = async () => {
    const res = await fetch('/api/menu');
    const data = await res.json();
    setMenuItems(data);
  };

  useEffect(() => {
    if (token) fetchMenuItems();
  }, [token]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Menu Items</h2>
        {menuItems.map((item: any) => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
