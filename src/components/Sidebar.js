import { DraggableItem } from './DraggableItem';

export const Sidebar = () => (
  <div className='sidebar'>
    <DraggableItem type='headline' label='Headline' />
    <DraggableItem type='title' label='Title' />
    <DraggableItem type='text' label='Text' />
    <DraggableItem type='disclaimer' label='Disclaimer' />
    <DraggableItem type='image' label='Image' />
    <DraggableItem type='two-column' label='2 Column Images' />
    <DraggableItem type='button' label='Button' />
    <DraggableItem type='spacer' label='SpacerItem' />
  </div>
);
