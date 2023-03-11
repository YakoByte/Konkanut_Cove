import React from 'react';
import * as NextImage from "next/image";
import Page3Panel from '../components/page3-panel';
import { Airplane, Car, Hotel } from '@icon-park/react';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export default {
  title: 'Page-3/Page3Panel',
  component: Page3Panel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators:[
    (Story)=>
        <div className="w-full sm:w-[800px]"><Story/></div>
  ]
};

const Template = (args) => <Page3Panel {...args} />;

export const Default = Template.bind({});
Default.args={
  title: "Day 1 : Trip to Agra",
  includedList:[
    {
      title:"Airport",
      Icon:Airplane
    },{
      title:"Accomodation",
      Icon:Hotel     
    },{
      title:"Travel",
      Icon:Car 
    }
  ],
  title2:"Arrival at Kudal or Sawantwadi / Chipi Airport - Devgad",
  desc:["Arrival at Kudal or Sawantwadi Railway station or Chipi airport. Proceed to devgad and check into the hotel.",
        "Morning, Proceed to Devgad Fort, situated at the confluence of Devgad Creek and Arabian Sea. Placed strategically on a narrow strip of land jutting into the Arabian Sea & proceed to Devgad beach for Zip Lining.",
        "Later Proceed to Kunkeshwar temple by Beautiful coastal road. A pristine beach with a very long stretch of seashoreand white sand adds to the beauty of temple surroundings. Later in the evening, proceed to AcharaJetty for Mangrove Safari.", 
        "Also visit Gajba devi temple for panoramic view. Thenproceed back to the hotel for mesmerizing sunset.Overnight stay at hotel."
        ]
};