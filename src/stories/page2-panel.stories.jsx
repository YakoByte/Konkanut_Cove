import Page2Panel from '../components/page2-panel';
import React from 'react';
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export default {
  title: 'Page-2/Page2Panel',
  component: Page2Panel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators:[
    (Story)=>
        <div className="sm:p-12 sm:py-36 sm:w-[800px]"><Story/></div>
  ]
};

const Template = (args) => <Page2Panel {...args} />;

export const Default = Template.bind({});
Default.args = {
    image:"https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title:"Sample Title 1",
    duration:"3 days 5 nights",
    desc:"Lorem Ipsum is simply dummy text of theprinting and typesetting Lorem Ipsum is ",
    discounted_rate:1900,actual_rate:2200,percent_off:5,
    width:800,
};

export const Small = Template.bind({});
Small.args = {
    image:"https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title:"Sample Title 1",
    duration:"3 days 5 nights",
    desc:"Lorem Ipsum is simply dummy text of theprinting and typesetting Lorem Ipsum is ",
    discounted_rate:1900,actual_rate:2200,percent_off:5,
    width:200,
};