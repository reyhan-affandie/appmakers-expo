import "react-native";

declare module "react-native" {
  interface ViewProps {
    dataSet?: { [key: string]: string };
    className?: string;
    onMouseEnter?: (e: any) => void;
    onMouseLeave?: (e: any) => void;
    onMouseMove?: (e: any) => void;
  }
  interface ScrollViewProps {
    dataSet?: { [key: string]: string };
    className?: string;
  }
  interface PressableStateCallbackType {
    hovered?: boolean;
    focused?: boolean;
  }
  interface TextStyle {
    outlineStyle?: string;
  }
}
