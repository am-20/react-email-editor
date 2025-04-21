import { DraggableItem } from './DraggableItem';

export const Sidebar = () => (
  <div className='sidebar'>
    <DraggableItem type='headline' label='Headline' />
    <DraggableItem type='title' label='Title' />
    <DraggableItem type='text' label='Text' />
    <DraggableItem type='disclaimer' label='Disclaimer' />
    <DraggableItem type='image' label='Image' />
    <DraggableItem type='columns-image' label='Columns Image' />
    <DraggableItem type='columns-content' label='Columns Content' />
    <DraggableItem type='button' label='Button' />
    <DraggableItem type='button-group' label='Button Group' />
    <DraggableItem type='spacer' label='SpacerItem' />
    <DraggableItem type='half-text' label='Half Text' />
    <DraggableItem type='round-container' label='Round Container' />
  </div>
);
