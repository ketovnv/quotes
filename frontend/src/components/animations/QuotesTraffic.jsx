import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Box, Typography } from "@mui/material";

const packetColors = {
  good: "#4caf50", // Зеленый для корректных данных
  corrupted: "#f44336", // Красный для испорченных данных
  neutral: "#9e9e9e", // Серый для остальных
};

const Circle = ({ value, status, delay }) => {
  const styles = useSpring({
    from: { transform: "translateX(-100px)" },
    to: { transform: "translateX(300px)" },
    config: { duration: 1000 },
    delay: delay,
  });

  return (
    <animated.div
      style={{
        ...styles,
        display: "inline-block",
        width: "30px",
        height: "30px",
        backgroundColor: packetColors[status],
        borderRadius: "50%",
        margin: "5px",
        position: "relative",
      }}
    >
      <Typography
        variant="caption"
        component="div"
        align="center"
        style={{ color: "#fff", position: "absolute", top: "7px", left: "7px" }}
      >
        {value}
      </Typography>
    </animated.div>
  );
};

const QuotesTraffic = () => {
  const [packets, setPackets] = useState([]);

  // Симуляция прихода новых пакетов через WebSocket
  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 100);
      const isCorrupted = Math.random() < 0.1; // 10% шанса испорченных пакетов
      const newPacket = {
        value: randomValue,
        status: isCorrupted ? "corrupted" : "good",
        id: Date.now(),
      };
      setPackets((prevPackets) => [...prevPackets.slice(-9), newPacket]); // Храним последние 10 пакетов
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "400px",
        height: "100px",
        overflow: "hidden",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {packets.map((packet, index) => (
        <Circle
          key={packet.id}
          value={packet.value}
          status={packet.status}
          delay={index * 100}
        />
      ))}
    </Box>
  );
};

export default QuotesTraffic;