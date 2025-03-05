import { FC } from "react";
import ConversationsList from "../../components/specific/conversationsList/conversationsList";
import TextField from "../../components/specific/textField/textField";

const MessagePage: FC = () => {

	return (
		<>
			<div className="chat__item">
					<ConversationsList />
			</div>
			<div className="chat__item">
					<TextField/>
			</div>
		</>
	)
};

export default MessagePage;