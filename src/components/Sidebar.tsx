import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/https';

interface SidebarProps{
    url:string
    id:string
}

const Sidebar: React.FC<SidebarProps> = ({url}) => {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        const getLeagues = async () => {
            try {
                const response = await axiosInstance.get(`/leagues`);

                if (response.status!=200) {
                    throw new Error('Failed to fetch leagues');
                }
                
                const data = await response.data;
                setLeagues(data);
            } catch (error) {
                console.error('Error fetching leagues:', error);
                // Handle error (e.g., show error message to user)
            }
        };

        getLeagues();
    }, []);

    return (
        <div className="bg-gray-200 h-screen w-1/6 p-4">
            <h2 className="text-lg font-semibold mb-4">Leagues</h2>
            <ul>
                {leagues.map((league:League) => (
                    <li key={league.id} className="cursor-pointer text-blue-600 hover:text-blue-800">
                        <Link to={`${url}${league.id}`}>{league.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
