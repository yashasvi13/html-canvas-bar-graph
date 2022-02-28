import React from "react";

function useCanvas(parentDom) {
  const [canvas, setCanvas] = React.useState(null);
  const [ctx, setCtx] = React.useState(null);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const initCanvas = React.useCallback(() => {
    const { width, height } = parentDom.current.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(pixelRatio, pixelRatio);

    parentDom.current.appendChild(canvas);
    setCanvas(canvas);
    setCtx(context);
    setWidth(width);
    setHeight(height);
  });

  const paint = React.useCallback((callback) => {
    ctx.save();
    callback?.(ctx);
    ctx.restore();
  });

  React.useEffect(() => {
    if (parentDom && parentDom.current && !canvas) {
      initCanvas();
    }
  }, [parentDom]);

  return [paint, width, height, ctx];
}

export default useCanvas;
