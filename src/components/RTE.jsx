import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
import config from '../config/config'


export default function RTE({ name, label, control, defaultValue = '' }) {
    
    // Function to handle image insertion
    const handleImageUpload = (editor) => {
      editor.windowManager.open({
        title: 'Insert Image',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'imageUrl',
              label: 'Image URL',
            },
          ],
        },
        onSubmit: (e) => {
          const imageUrl = e.getData().imageUrl;
          editor.insertContent(`<img src="${imageUrl}" alt="Image" style="max-width: 100%;" />`);
        },
      });
    };
  
    return (
      <div className="w-full">
        {label && <label htmlFor={name} className="inline-block mb-1 pl-1">{label}</label>}
        <Controller
          name={name || 'Content'}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              initialValue={defaultValue}
              apiKey={config.RTE_API_key}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'image', 'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor',
                  'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table',
                  'code', 'help', 'wordcount',
                ],
                toolbar: `undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | customTextBox | customImageInsert | help`,
                setup: (editor) => {
                  
  
                  // Add custom button for inserting images
                  editor.ui.registry.addButton('customImageInsert', {
                    text: 'Insert Image',
                    onAction: () => handleImageUpload(editor),
                  });
                },
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    );
  }
