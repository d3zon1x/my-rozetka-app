import { Button, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

interface IProductItem {
    id: number;
    name: string;
    image: string;
}

const HomePage = () => {
    const [list, setList] = useState<IProductItem[]>([]);

    // const mapData = list.map(item => {  
    //     return (
    //         <li key={item.id}>{item.name}</li>
    //     )
    // });



    useEffect(() => {
        axios.get<IProductItem[]>("http://pv116.rozetka.com/api/products")
            .then(resp => {
                setList(resp.data);
                console.log(resp.data);
            });
    }, []);

    const columns : ColumnsType<IProductItem> = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render:(image: string) => {
                return(
                    <img src={'http://pv116.rozetka.com/upload/1200_'+ image} width={250} alt='Photo'/>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render:(_, record) => (
                <Popconfirm
                    title="Do u really want to delete this product?"
                    onConfirm={async () => {
                        try {
                            await axios.delete('http://pv116.rozetka.com/api/products/'+record.id);
                            setList(list.filter(x=>x.id!=record.id));

                        } catch (error) {
                            console.error('Error fetching category details:', error);
                            throw error;
                        }
                    }}
                    okText="Так"
                    cancelText="Ні"
                >
                    <Button icon={<DeleteOutlined />}>
                        Delete
                    </Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <>
            <h1>Products</h1>
            <Link to={"/products/create"}>Add product</Link>
            <Table dataSource={list} rowKey='id' columns={columns} />
            {/*<ul>*/}
            {/*    {mapData}*/}
            {/*</ul>*/}
        </>
    )
}

export default HomePage;