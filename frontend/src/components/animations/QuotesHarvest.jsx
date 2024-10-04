import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Box, Typography } from "@mui/material";

const packetColors = {
  good: "#4caf50", // Зеленый для корректных данных
  corrupted: "#f44336", // Красный для испорченных данных
  delayed: "#ff9800", // Оранжевый для задержанных пакетов
};

const Circle = ({ value, status, delay, pauseTime }) => {
  const [paused, setPaused] = useState(false);

  const styles = useSpring({
    from: { transform: `translateX(${paused ? 0 : "-100px"})` },
    to: { transform: `translateX(${paused ? "200px" : "300px"})` },
    config: { duration: paused ? pauseTime : 1000 },
    onRest: () => setPaused(false),
    delay: delay,
  });

  useEffect(() => {
    if (pauseTime > 0) {
      setPaused(true); // Пауза, если пакет требует времени на расчёт
    }
  }, [pauseTime]);

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

const QuotesHarvest = () => {
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 100);
      const isCorrupted = Math.random() < 0.1; // 10% шанса испорченных пакетов
      const isDelayed = Math.random() < 0.2; // 20% шанс задержки
      const newPacket = {
        value: randomValue,
        status: isCorrupted ? "corrupted" : isDelayed ? "delayed" : "good",
        pauseTime: isDelayed ? 500 : 0, // Пакеты с задержкой останавливаются на 500ms
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
        position: "relative",
      }}
    >
      {packets.map((packet, index) => (
        <Circle
          key={packet.id}
          value={packet.value}
          status={packet.status}
          delay={index * 100}
          pauseTime={packet.pauseTime}
        />
      ))}
    </Box>
  );
};

export default QuotesHarvest;