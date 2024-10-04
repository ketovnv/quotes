import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Draggable from "react-draggable";

const panels = [
    { id: 1, initialX: 0, initialY: 0 },
    { id: 2, initialX: 150, initialY: 0 },
    { id: 3, initialX: 0, initialY: 150 },
    { id: 4, initialX: 150, initialY: 150 },
];

const springConfig = { tension: 170, friction: 26 };

const Panel = ({ id, x, y, onDrag }) => {
    const [style, api] = useSpring(() => ({
        x: x,
        y: y,
        config: springConfig,
    }));

    return (
        <Draggable
            position={{ x: style.x.get(), y: style.y.get() }}
            onDrag={(e, data) => {
                api.start({ x: data.x, y: data.y });
                onDrag(id, data.x, data.y);
            }}
        >
            <animated.div
                style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#3498db",
                    position: "absolute",
                    ...style,
                }}
            />
        </Draggable>
    );
};

const SpringEngine = () => {
    const [positions, setPositions] = useState(
        panels.reduce((acc, panel) => {
            acc[panel.id] = { x: panel.initialX, y: panel.initialY };
            return acc;
        }, {})
    );

    const handleDrag = (id, newX, newY) => {
        // Обработка столкновений и отталкивание
        const newPositions = { ...positions };
        newPositions[id] = { x: newX, y: newY };

        // Проверяем пересечения и при необходимости добавляем отталкивание
        Object.keys(newPositions).forEach((panelId) => {
            if (parseInt(panelId) !== id) {
                const dx = newX - newPositions[panelId].x;
                const dy = newY - newPositions[panelId].y;
                const distance = Math.sqrt(dx * dy);
                const collisionDistance = 100; // Задаем дистанцию столкновения
                if (distance < collisionDistance) {
                    // Реакция на столкновение - небольшое отталкивание
                    newPositions[id] = {
                        x: newX + dx * 0.2,
                        y: newY + dy * 0.2,
                    };
                }
            }
        });

        setPositions(newPositions);
    };

    return (
        <div style={{ width: "400px", height: "400px", position: "relative" }}>
            {Object.keys(positions).map((id) => (
                <Panel
                    key={id}
                    id={parseInt(id)}
                    x={positions[id].x}
                    y={positions[id].y}
                    onDrag={handleDrag}
                />
            ))}
        </div>
    );
};

export default SpringEngine;