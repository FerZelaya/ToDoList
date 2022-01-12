import { routes } from 'routes/routes'
import {paxios} from '../../utilities/axios' 


export const showAlluser = async () => {
    try{
        const {data} = await paxios.get(
            routes.HOST + routes.showAllTodos
        )
        return data
    }catch(error){
        throw(error)
    }
}

export const postNew = async (todoData)=>{
    
    try {
        const {data} = await paxios.post(
            routes.HOST + routes.postTodo,
            todoData
        )
        return data
    } catch (error) {
        throw error
    }
}