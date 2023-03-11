import React from 'react';

import * as NextImage from "next/image";
import Page3Panel3 from '../components/page3-panel3';
import { Select } from '../constants/select-status';


const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export default {
  title: 'PAGE-3/Page3Panel3',
  component: Page3Panel3,
  argTypes: {
  },
  decorators:[
    (Story)=>
      <div className='w-[500px]'>
        <div className='p-5'><Story/></div>
      </div>
  ]
};

const Template = (args) => <Page3Panel3 {...args}/>;

export const Default = Template.bind({});
Default.args = {
  image:"https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  imageWidth:250,
  imageHeight:172,
  carType:"Sedan",
  seats:7
};

export const Selected = Template.bind({});
Selected.args = {
  image:"https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  imageWidth:250,
  imageHeight:172,
  carType:"Sedan",
  seats:7,
  selectionStatus:Select.SELECTED
};

export const Disabled = Template.bind({});
Disabled.args = {
  image:"https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  imageWidth:250,
  imageHeight:172,
  carType:"Sedan",
  seats:7,
  selectionStatus:Select.SELECT_DISABLED
};