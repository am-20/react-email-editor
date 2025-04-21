import Headline from './Elements/Headline';
import Title from './Elements/Title';
import Text from './Elements/Text';
import Disclaimer from './Elements/Disclaimer';
import ImageItem from './Elements/ImageItem';
import ColumnsImage from './Elements/ColumnsImage';
import ColumnsContent from './Elements/ColumnsContent';
import ButtonItem from './Elements/ButtonItem';
import SpacerItem from './Elements/SpacerItem';
import ButtonGroup from './Elements/ButtonGroup';
import HalfTextItem from './Elements/HalfTextItem';
import RoundContainer from './Elements/RoundContainer';

/**
 * Central map: sidebar “type” ➜ actual React component.
 * Add new elements only here.
 */
const ELEMENT_REGISTRY = {
  headline: Headline,
  title: Title,
  text: Text,
  disclaimer: Disclaimer,
  image: ImageItem,
  button: ButtonItem,
  spacer: SpacerItem,
  'columns-image': ColumnsImage,
  'columns-content': ColumnsContent,
  'button-group': ButtonGroup,
  'half-text': HalfTextItem,
  'round-container': RoundContainer,
};

export default ELEMENT_REGISTRY;
