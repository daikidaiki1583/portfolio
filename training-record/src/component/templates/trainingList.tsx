import React , { FC , useState,useMemo} from 'react';
import Training from '../organisms/training';
import { TrainingType } from '../organisms/training';
import { useForm } from 'react-hook-form';
import { calculateToday } from '../today/today';
import './trainingList.scss';

const TrainingList: FC = () => {
    const { register , handleSubmit , reset} = useForm<TrainingType>();   

    const [ trainingList, setList ] = useState<TrainingType[]>([]);
    const [ id, setId ] = useState<number>(trainingList.length + 1);
    const [ isactive, setActive ] = useState<boolean>(false);
    
    const today = useMemo(()=> calculateToday(),[]);

    const onSubmit = (data: TrainingType) => {
        const {trainingName} = data;
        if (!trainingName) {
            alert('トレーニング名を入力してください。') 
            return
        } else if (trainingList.some((name) => name.trainingName === trainingName )) { 
            alert("そのトレーニングは既に登録されています。") 
            reset()
            return
        }
        setList([
            ...trainingList,
            {
                trainingName:trainingName,
                id:id
            }   
        ]);
        setId((count) => count + 1 )

        reset();
    }

    const deleteTraining = (training: TrainingType) => {
        setList((prev) => prev.filter((list) => list.id !== training.id))   
    }

    return (
        <div className='container'>
            <h1>筋トレ記録</h1>
            <p>筋トレ成果を記録して、昨日の自分を超えていこう。</p>
            <div 
                className='circle add-item'
                onClick={() => setActive((active) => !active )}
            >
                <i className="fas fa-plus"></i>
            </div>
            <form className={`input-form ${isactive ? 'active': ''}`}  onSubmit={handleSubmit(onSubmit)}>
                <input className='input-training-name' name='trainingName' ref={register} placeholder='筋トレ名'/>
                <button className='add-training' type='submit'>新しい筋トレメニューを追加</button>
            </form>
            
            <div className='main'>
                {
                    trainingList.map((list) => {
                        return(
                                <Training
                                    training={list}
                                    key={list.id}
                                    today={today}
                                    deleteTraining={deleteTraining}
                                />
                        )
                    })
                }           
            </div>
        </div>
    )
}

export default TrainingList;