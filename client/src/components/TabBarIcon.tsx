import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color?: string;
  size?: number
  onPress?: () => void
}) {
  return <FontAwesome size={props.size || 30} style={{marginBottom: -3}} {...props} />;
}

export default TabBarIcon