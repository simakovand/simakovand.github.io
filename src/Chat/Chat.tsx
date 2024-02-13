import { useEffect, useState } from 'react';
import { List, Avatar, Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import myToken from '../../src/token.ts'
import OpenAI from 'openai';
const { TextArea } = Input;

function Chat () {
	const user = useSelector(state => state.first.firstStore)
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [answer, setAnswer] = useState('yes');
	const token = myToken
	

	const data = JSON.stringify({
		'model': 'GigaChat',
		'messages': [
			{
				'role': 'user',
				'content': '11 в квадрате сколько будет?'
			}
		],
		'temperature': 1,
		'top_p': 0.1,
		'n': 1,
		'stream': false,
		'max_tokens': 512,
		'repetition_penalty': 1,
		'update_interval': 0
	});
	
	const config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
		headers: { 
			'Content-Type': 'application/json', 
			'Accept': 'application/json', 
			'Authorization': 'Bearer eyJjdHkiOiJqd3QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.M2lrZeAWcIju7xg5y3z4WoUGO-5xhODxA20zCdFZPTfex8HbYHZjoL7nPnYrj7KnUo2zFLpBL521iQvXO7gD_lY3p2B-T-1sulbWPM9NW0--fW604la_kb3JnWKQRBmVt0zfHxv3xMe33JgrtdxNzK810V0Nl8NaEfimeCjPNnSly10Ft2HXloxUylyhLsboX8V-_LhvA74tQdP21JLmqcNdpLnd1VmBeH5bpUPHA7ibhwmpIxr1iG1NLfyI3GmBEvQsPQi6SABHsC45hi6l5SNiBczroGzUcF6dOdSYBpXxjKRcoIHPg1lh3Sc7f_4yrCBVNxCICifgOK4NK8AAIQ.dQMaj8zTypYnJmMhIe9QDg.BZFUHxrpAZPziHcq6qg_oS6y0vYHUc0GC2E062F5wCPrUGNPIrmNMy7Xh7-pwDB5Fv4560TOWzH3h_vDDVk2ox_0hrhhXclPYr4sK63tpc5ZVkZhqbYOe6AdJv9isRRoet4s1AQxskUJNiqmigDR6wmm8CB-e5NlwmAMgHZRbO0TX__8GzLnBAnEehDb1iA84OdPgkw5EtyM_se6O63uPKtLBdNV__5-0zHYD3--wcmKniuXBOXEPM7vJquMyMXxvV8vepkS3mauoxsCSVkjost3eIkjLuxLbDhdTD26XgwC3Phn45y1g-XFMuC0gRnznH015o_sSD2S5YARIBnV_iGl45hZs0RCtvLFLwg3_GdUfZuXBN4Z6fwFDsYTGH_DMNOBlXd_SkKiVHtJ6754A3kzzHvPhG6y6Sb_u54-A1c7roRsp76tjQn8n2GiER4b8tbkcCFqec7hxS76RDgem2LU1utJ3aJuTZABNRVYl5Su7oc67UwL8r53nM--TNU4ENiyLOv5Wje2Dq1zl8E69F3K59UxDBx5GyP1-Lk9IEj4a4-Kjczdc5RaZEK8fOgYexHyBVGFHvstS0chUp1k0EcOOrdqIrB1q-4PWBb6gQvh8sl-T7efeaaqM2dNHvmjPzsO1efxPcK2W9YuPoawuv_46U9K8fC6_lRW5y9Z6kfU4o1vWqY8Acd4h8dFw3CQor9ssK5n4VVgN7ZSf7Vxbr_jLrYfA_nBF5LxLrj1ulA.ZiZJqT0BnpMtaiEWC74NXtr-Wb4P95R-3BEdAhFwaKo'
		},
		data : data
	};
	
	axios(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
			console.log(error);
		});



	const handleSubmit = () => {
		if (inputValue.trim() !== '') {
			setMessages(
				[
					...messages, 
					{ content: inputValue, user: user, avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=' }, 
					{content: answer, user: 'GIGACHAT', avatar: 'https://dudewipes.com/cdn/shop/articles/gigachad.jpg?v=1667928905&width=2048'}
				]
			);
			axios(config)
				.then((response) => {
					console.log(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
			setInputValue('');
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault(); // Предотвращаем перенос строки
			handleSubmit();
		}
	};


	return (
		<>
			<List
				itemLayout="horizontal"
				dataSource={messages}
				renderItem={(message, index) => (
					<List.Item key={index}>
						<List.Item.Meta
							avatar={
								<Avatar src={
									messages[index].user === 'GIGACHAT' ? 
										messages[index].avatar : 
										`${messages[index].avatar}${index}`} 
								alt={`${user} Avatar` }
								/>
							}
							title={messages[index].user}
							description={message.content}
						/>
					</List.Item>
				)}
			/>
			<Form onFinish={handleSubmit}>
				<Form.Item>
					<TextArea
						rows={4}
						placeholder="Введите ваше сообщение"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown} // Обработка нажатия клавиши Enter
					/>
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" type="primary">
            Отправить
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Chat;
