import React from 'react';
import StoryWrapper from './components/story_wrapper';

import * as NextImage from "next/image";
import Page3Panel2 from '../components/page3-panel2';


const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export default {
  title: 'PAGE-3/Page3Panel2',
  component: Page3Panel2,
  argTypes: {
  },
  decorators:[
    (Story)=>
      <div className='w-full sm:w-[1000px]'>
        <div className='p-5'><Story/></div>
      </div>
  ]
};

const Template = (args) => <Page3Panel2 {...args}/>;

export const Default = Template.bind({});
Default.args = {
  image:"https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  title: 'Luxury Resort',
  location: 'Maldives',
  distance: '5km',
  fromLocation: 'New York',
  fromDate: new Date('2023-04-01'),
  toDate: new Date('2023-04-08'),
  includes: ['Free breakfast', 'Spa access'],
  room_type: 'Deluxe Suite',
  imageWidth:240,imageHeight:160
};