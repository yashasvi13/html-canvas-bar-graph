import React from "react";
import useCanvas from "./useCanvas";

const dims = {
  offset: 20
};

const data = [20, 30, 60, 99, 150];

function UserJourney() {
  const canvasWrapper = React.useRef();
  const [paint, width, height, ctx] = useCanvas(canvasWrapper);

  const renderAxis = () => {
    paint((ctx) => {
      ctx.strokeStyle = "grey";
      ctx.beginPath();
      ctx.moveTo(dims.offset, dims.offset);
      ctx.lineTo(dims.offset, height - dims.offset);
      ctx.lineTo(width - dims.offset + 100, height - dims.offset);
      ctx.stroke();
      data.forEach((point, index) => {
        ctx.fillText(`${point}`, 0, point);
      });
    });
  };

  const renderBar = () => {
    paint((ctx) => {
      ctx.strokeStyle = "#0067DD";
      ctx.lineWidth = 20;

      data.forEach((point, index) => {
        ctx.beginPath();
        const x = dims.offset * 2 + index * dims.offset * 3;
        const y = point;
        ctx.moveTo(x, y);
        ctx.lineTo(x, height - dims.offset);
        ctx.stroke();
      });
    });
    paint((ctx) => {
      ctx.strokeStyle = "#0067DD10";
      ctx.lineWidth = 20;

      data.forEach((point, index) => {
        if (index) {
          ctx.beginPath();
          const x = dims.offset * 2 + index * dims.offset * 3;
          const y = data[index - 1];
          ctx.moveTo(x, y);
          ctx.lineTo(x, height - dims.offset);
          ctx.stroke();
        }
      });
    });
  };

  const renderConnectedLines = () => {
    paint((ctx) => {
      ctx.fillStyle = "#0067DD40";
      ctx.beginPath();
      let lastX = 0;
      data.forEach((point, index) => {
        const x = dims.offset * 2 + index * dims.offset * 3;
        const y = point;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x - 10, y);
        }
        lastX = x;
        ctx.lineTo(x + 10, y);
      });
      ctx.lineTo(lastX + 10, height - dims.offset);
      ctx.lineTo(dims.offset * 2 + 10, height - dims.offset);
      ctx.lineTo(dims.offset * 2 + 10, data[0]);
      ctx.fill();
    });
  };

  const render = React.useCallback(() => {
    renderAxis();
    renderBar();
    renderConnectedLines();
    // renderLegands();
  });

  React.useEffect(() => {
    if (ctx) {
      render();
    }
  }, [ctx]);

  return (
    <div style={{ width: "300px", height: "200px" }} ref={canvasWrapper}></div>
  );
}

export default UserJourney;
