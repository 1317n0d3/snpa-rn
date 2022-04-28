import { ImagePickerOptions } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";

export const getImageUri = async (options?: ImagePickerOptions) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    return result.uri
  } else {
    return ''
  }
}