import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const CoinFlip = () => {
  const [side, setSide] = useState("heads");
  const [selectedSide, setSelectedSide] = useState("heads");
  const [isFlipping, setIsFlipping] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMortification, setShowMortification] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);
    setShowCelebration(false); // Hide confetti when flipping starts

    // Simulate coin flip and resolve result
    setTimeout(() => {
      const result = Math.random() > 0.5 ? "heads" : "tails";
      setSide(result);
      setIsFlipping(false);

      // Check if the flipped side matches the selected side
      if (result === selectedSide) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 5000); // Show confetti if it matches
      }
      else {
        setShowMortification(true); // Show mortification
        setTimeout(() => setShowMortification(false), 2000);
      }
    }, 2000); // Flip duration matches animation time
  };

  const handleSelectChange = (event) => {
    setSelectedSide(event.target.value); // Update selected side based on dropdown
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
    },
    coinContainer: {
      perspective: "1000px",
    },
    coin: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#C0C0C0",
      justifyContent: "center",
      fontSize: "20px",
      fontWeight: "bold",
      color: "black",
      transformStyle: "preserve-3d",
    },
    text: {
      position: "absolute",
      backfaceVisibility: "hidden",
    },
    button: {
      // marginTop: "30px",
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#2ecc71",
      color: "white",
      cursor: "pointer",
    },
    dropdown: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginTop: "20px",
    }, 
    winText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "60px",
      fontWeight: "bold",
      color: "#2ecc71",
      zIndex: 10,
    },
    failText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "60px",
      fontWeight: "bold",
      color: "red",
      zIndex: 10,
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.coinContainer}>
        <h3>Coin Flip</h3>
        <motion.div
          animate={{
            rotateY: isFlipping ? [0, 360] : 0,
          }}
          transition={{
            duration: isFlipping ? 2 : 0,
            ease: "easeInOut",
          }}
          style={styles.coin}
        >
          <AnimatePresence>
            {!isFlipping && (
              <motion.div
                key={side}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={styles.text}
              >
                {side.toUpperCase()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dropdown for selecting Heads or Tails */}
      <select
        value={selectedSide}
        onChange={handleSelectChange}
        style={styles.dropdown}
      >
        <option value="heads">Heads</option>
        <option value="tails">Tails</option>
      </select>

      {/* Button to trigger the coin flip */}
      <button onClick={flipCoin} disabled={isFlipping} style={styles.button}>
        {isFlipping ? "Flipping..." : "Flip Coin"}
      </button>

      {/* Show confetti if the selected side matches the rolled side */
      showCelebration && <><Confetti
        width={window.innerWidth - 10} // Set the width to the window size
        height={window.innerHeight - 10} // Set the height to the window size
        />
        <motion.div
        key="winText"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={styles.winText}
      >
          YOU WON
        </motion.div></>}

        {/* ShowMortification when user fails*/
      showMortification && <>
      <motion.div
      key="failText"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={styles.failText}
    >
        YOU FAILED
      </motion.div></>}
    </div>
  );
};

export default CoinFlip;