interface EdgeControlsProps {
  onEdgeControl: (direction: 'prev' | 'next', e: React.MouseEvent) => void;
}

export const EdgeControls = ({ onEdgeControl }: EdgeControlsProps) => {
  return (
    <>
      <div
        className="absolute inset-y-0 left-0 z-10 h-full w-1/12 cursor-pointer"
        onClick={e => onEdgeControl('prev', e)}
      />
      <div
        className="absolute inset-y-0 right-0 z-10 h-full w-1/12 cursor-pointer"
        onClick={e => onEdgeControl('next', e)}
      />
    </>
  );
};
