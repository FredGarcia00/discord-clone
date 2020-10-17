import React,{ useState, useEffect } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import AddIcon from '@material-ui/icons/Add'
import SidebarChannel from './SidebarChannel'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CallOutlinedIcon from '@material-ui/icons/CallOutlined'
import { Avatar } from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import HeadsetIcon from '@material-ui/icons/Headset'
import SettingsIcon from '@material-ui/icons/Settings'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import db, { auth } from './firebase'
import './Sidebar.css'


function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot =>
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),
            }))
         )
        )
    }, [])
    console.log(channels);
    const handleAddChannel = () => {
        const channelName = prompt('Enter a new channel name')

        if (channelName) {
            db.collection('channels').add({
                channelName:channelName
            });
        }
    };
    return (
        <div className='sidebar'>
           <div className="sidebar__top">
               <h3>FJG Room</h3>
               <ExpandMoreIcon/>
           </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon/>
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel"/>
                </div>
                <div className="sidebar__channelsList">
                    {channels.map((channel, id ) => (
                        <SidebarChannel key={id}
                        id={channel.id}
                        channelName={channel.channel.channelName}/>
                    ))}
                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAltIcon
                className='sidebar__voiceIcon'
                fontSize='large'/>
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon/>
                    <CallOutlinedIcon/>
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar onClick={()=> auth.signOut()} src={user.photo}/>
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon/>
                    <HeadsetIcon/>
                    <SettingsIcon/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
