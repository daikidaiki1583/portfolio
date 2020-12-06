import React , { FC }from 'react';
import { Table } from 'semantic-ui-react';
import { Record } from '../organisms/training';
import './recordItem.scss';

type Props = {
    record: Record
    deleteRecord: (record: Record) => void;
}


const RecordItem: FC<Props> = ({record,deleteRecord}) => {
    return (
            <Table.Row>
                <Table.Cell>{record.date}</Table.Cell>
                <Table.Cell>{record.count}</Table.Cell>
                <Table.Cell className='record'>
                    <div 
                        className='circle' 
                        onClick={() => deleteRecord(record)}
                    >
                        <i className="fas fa-times"></i>
                    </div>
                </Table.Cell>
            </Table.Row>
    )
};

export default RecordItem;