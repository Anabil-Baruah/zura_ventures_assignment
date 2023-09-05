import React, { useState, useRef, useEffect } from 'react'
import { Form, Input, Button, Select, Image, ColorPicker, message, Switch } from 'antd'
import Emptyellipse from '../../assets/empty-ellipse.svg'
import upload_icon from '../../assets/upload_icon.svg'
import { DeleteOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { selectOptions, selectChatIcon } from '../../utils/selectDropDown'

const Display = () => {
  const [primaryColor, setPrimaryColor] = useState('#7BD568');
  const [fontColor, setFontColor] = useState('#3C3C3C');
  const [showSource, setShowSource] = useState(true);
  const [image, setImage] = useState(null); // for bot image
  const [selectedFileName, setSelectedFileName] = useState('');
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/project/config/get_dispaly_field/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          const { primaryColor, fontColor, fontsize, chatHeight, showSources, chat_position,
            chat_icon,
            chat_bottom_distance,
            chat_horizontal_distance,
            bot_image } = res.data;

          setPrimaryColor(primaryColor);
          setFontColor(fontColor);
          setShowSource(showSources);
          setImage(bot_image);


          form.setFieldsValue({
            font_size: fontsize,
            chat_height: chatHeight,
            position_on_screen: chat_position,
            chat_icon_size: chat_icon,
            dist_from_bottom: chat_bottom_distance,
            horizontal_dist: chat_horizontal_distance,
            bot_img: bot_image
          });
        } else {
          message.error(res.data?.message);
        }
      })
      .catch((err) => {
        message.error('Something went wrong');
      });
  },[])

  // const selectOptions = [
  //   {
  //     value: '1',
  //     label: 'Bottom Left',
  //   },
  //   {
  //     value: '2',
  //     label: 'Bottom Right',
  //   },
  //   {
  //     value: '3',
  //     label: 'Top Left',
  //   },
  //   {
  //     value: '4',
  //     label: 'Top Right',
  //   },
  //   {
  //     value: '5',
  //     label: 'Middle',
  //   }
  // ]
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileInputChange = (e) => {
    setImage("")
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFileName(selectedFile.name);
    }

    const data = new FormData();
    data.append('file', selectedFile);
    data.append('upload_preset', 'myChat');
    data.append('cloud_name', 'dudvqptv0');

    fetch('https://api.cloudinary.com/v1_1/dudvqptv0/image/upload', {
      method: 'post',
      body: data
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url);
      })
      .catch((err) => {
        message.error('Something went wrong');
      });

  };
  const handleSubmit = (values) => {
    values.primary_color = values.primary_color || "";
    values.Font_Color = values.Font_Color || "";
    values.bot_img = image || "";
    values.chat_height = values.chat_height || "";
    values.chat_icon_size = values.chat_icon_size || "";
    values.dist_from_bottom = values.dist_from_bottom || "";
    values.font_size = values.font_size || "";
    values.horizontal_dist = values.horizontal_dist || "";
    values.position_on_screen = values.position_on_screen || "";
    values.show_sources = values.show_sources || false;
    values.primary_color = primaryColor;
    values.Font_Color = fontColor;

    axios
      .post('/project/config/update_display_field', { id, ...values })
      .then((res) => {
        message.success('Updated Successfully');
      })
      .catch((err) => {
        message.error('Something went wrong');
      });
  }
  return (
    <div>
      <Form
        form={form}
        style={{ width: '90%' }}
        layout="vertical"
        onFinish={handleSubmit}
      >

        <Form.Item name="primary_color" label="Primary Color" >
          <div style={{ display: 'flex', gap: '1rem', marginRight: '3rem' }}>
            <Input size='large' value={primaryColor} />
            <ColorPicker value={primaryColor} onChange={(color, hex) => { setPrimaryColor(hex) }} />
          </div>
        </Form.Item>

        <Form.Item name="Font_Color" label="Font Color">
          <div style={{ display: 'flex', gap: '1rem', marginRight: '3rem' }}>
            <Input size='large' value={fontColor} />
            <ColorPicker value={fontColor} onChange={(color, hex) => { setFontColor(hex) }} />
          </div>
        </Form.Item>

        <Form.Item
          name="font_size"
          label="Font Size (in px)"
        >
          <Input size='large' />
        </Form.Item>
        <Form.Item
          name="chat_height"
          label="Chat Height (in % of total screen)"
        >
          <Input size='large' style={{ width: 400 }} />
        </Form.Item>
        <Form.Item
          name="show_sources"
          label="Show Sources"
          valuePropName="checked"

        >
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Switch size='large' color="red" checked={showSource} onChange={() => { setShowSource(!showSource) }} />
          </div>
        </Form.Item>

        <hr />
        <h3>Chat Icon</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Form.Item
            name="position_on_screen"
            label="Position on Screen"
          // initialValue={selectOptions[0].value}
          >
            <Select
              showSearch
              style={{
                width: 400,
              }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={selectOptions}
            />
          </Form.Item>
          <Form.Item
            name="chat_icon_size"
            label="Chat Icon Size"
          >
            <Select
              showSearch
              style={{
                width: 400,
              }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={selectChatIcon}
            />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Form.Item
            name="dist_from_bottom"
            label="Distance from Bottom (in px)"
          >
            <Input size='large' style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            name="horizontal_dist"
            label="Horizontal Distance (in px)"
          >
            <Input size='large' style={{ width: 400 }} />
          </Form.Item>
        </div>
        <Form.Item
          name="bot_img"
          label="Bot Icon"
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Image src={image || Emptyellipse} size='large' style={{ width: 50,height: 50, borderRadius:'50%', objectFit:'cover' }} />
            <Button
              ghost
              style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '1rem', backgroundColor: '#7E22CE' }}
              onClick={handleButtonClick}
            >
              Upload Image
              <img src={upload_icon} style={{ width: 20 }} alt="" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
              accept="image/*"
            />
          </div>
        </Form.Item>
        {selectedFileName && (
          <div className='card' style={{
            display: 'flex',
            gap: '0.5rem',
            borderRadius: '6px', padding: '0.4rem',
            width: 'fit-content',
            marginLeft: '3rem'
          }}>
            <strong>{selectedFileName}</strong>
            <DeleteOutlined style={{ color: 'red' }} 
            onClick={() => { setSelectedFileName(null), setImage(null) }} 
            />
          </div>
        )}
        <Form.Item>
          <Button type="primary"
            htmlType="submit"
            style={{margin:'1rem'}}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Display