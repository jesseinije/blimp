// Text style options
export interface TextStyle {
  color: string;
  fontSize: number;
  fontFamily: string;
}

// Text overlay interface
export interface TextOverlay {
  id: string;
  text: string;
  style: TextStyle;
  position: { x: number; y: number };
  isSelected: boolean;
}
