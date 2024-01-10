import { Button, Divider, Form, Input, message } from "antd";
import Upload, { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { useState } from "react";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import { IProductCreate } from "../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCreatePage = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);

    const onSubmit = async (values: any) => {
        if(file==null) {
            message.error("Оберіть фото!");
            return;
        }
        const model : IProductCreate = {
            name: values.name,
            image: file
        };
        try {
            await axios.post("http://pv116.rozetka.com/api/products", model,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate("/");
        }
        catch (ex) {
            message.error('Помилка створення категорії!');
        }
    }

    const onSubmitError = async (errorInfo: any) => {
        console.log("Error: ", errorInfo);
    }

    type FieldType = {
        name?: string;
    }

    const beforeUpload = (file: RcFile) => {
        const isImage = /^image\/\w+/.test(file.type);
        if (!isImage) {
            message.error('Оберіть файл зображення!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Розмір файлу не повинен перевищувать 10MB!');
        }
        console.log("is select", isImage && isLt2M);
        return isImage && isLt2M;
    };
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            const file = info.file.originFileObj as File;
            setLoading(false);
            setFile(file);
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    return (
        <>
            <Divider>Add product</Divider>
            <Form initialValues={{ remember: true }} onFinish={onSubmit} onFinishFailed={onSubmitError}>
                <Form.Item<FieldType>
                    label="Name"
                    name='name'
                    rules={[{ required: true, message: 'Enter name!' }]}>
                    <Input />
                </Form.Item>
<div>

                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    accept={"image/*"}
                    >
                    {file ? <img src={URL.createObjectURL(file)} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                </Upload>
                    </div>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ProductCreatePage;