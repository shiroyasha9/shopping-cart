import React, { useEffect, useState } from "react";
import { Text, Animated } from "react-native";
import EventEmitter from "../EventEmitter";

const ToastComponent = () => {
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(3000);
  const animation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const showListener = (msg: string, duration: number) => {
      setMessage(msg);
      setDuration(duration);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    EventEmitter.on("showToast", showListener);

    return () => {
      EventEmitter.removeListener("showToast", showListener);
    };
  }, [animation]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setMessage(""));
      }, duration);
    }
  }, [message, animation, duration]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  if (!message) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 40,
        backgroundColor: "#383837",
        padding: 10,
        borderRadius: 50,
        width: "70%",
        transform: [{ translateY }],
        alignSelf: "center",
        zIndex: 9999,
      }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>{message}</Text>
    </Animated.View>
  );
};

export default ToastComponent;
