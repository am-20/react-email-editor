import Headline from './Elements/Headline';
import Title from './Elements/Title';
import Text from './Elements/Text';
import Disclaimer from './Elements/Disclaimer';
import ImageItem from './Elements/ImageItem';
import TwoColumnImages from './Elements/TwoColumnImages';
import ButtonItem from './Elements/ButtonItem';
import SpacerItem from './Elements/SpacerItem';

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
  'two-column': TwoColumnImages,
};

export default ELEMENT_REGISTRY;
