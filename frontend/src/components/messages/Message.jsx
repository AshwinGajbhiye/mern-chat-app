import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversations';

const Message = ({ message }) => {
	const {authUser} = useAuthContext();
	const { selectedConversation } = useConversation();

	const fromMe = message.senderId === authUser?._id; // Ensure authUser is defined
	const chatClassName = fromMe ? 'chat-end' : 'chat-start';
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic || 'defaultProfilePicUrl'; // Handle undefined profile picture
	const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-500'; // Optional: Set a different color for the other user
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='User avatar' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
				{message.message}
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
				{/* Replace '12:00' with the actual message timestamp */}
				{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
			</div>
		</div>
	);
};

export default Message;
