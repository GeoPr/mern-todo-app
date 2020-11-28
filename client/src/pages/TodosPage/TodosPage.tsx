import React from 'react'
import { Form } from '../../components/Form/Form'
import { List } from '../../components/List/List'
import './TodosPage.scss'

export const TodosPage: React.FC = () => {
	return (
		<div className="todos">
			<div className="todos__body">
				<Form />
				<List />
			</div>
		</div>
	)
}