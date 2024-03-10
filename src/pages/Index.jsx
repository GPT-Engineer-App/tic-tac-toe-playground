import React, { useState } from "react";
import { Box, Grid, Button, Text, VStack, useToast, Heading, Center } from "@chakra-ui/react";

const Index = () => {
  const toast = useToast();
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);

  const checkForWinner = (squares) => {
    const combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (squares[pattern[0]] === "" || squares[pattern[1]] === "" || squares[pattern[2]] === "") {
          // do nothing
        } else if (squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    if (cells[num] !== "" || winner) {
      return;
    }

    let squares = [...cells];

    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else {
      squares[num] = "O";
      setTurn("X");
    }

    checkForWinner(squares);
    setCells(squares);
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
    setTurn("X");
  };

  const Cell = ({ num }) => {
    return (
      <Button h="20" w="20" colorScheme="teal" variant="outline" onClick={() => handleClick(num)} disabled={cells[num] !== ""} style={{ boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.2)" }}>
        {cells[num] === "X" ? <img src="/cat.png" alt="Cat" /> : cells[num] === "O" ? <img src="/dog.png" alt="Dog" /> : null}
      </Button>
    );
  };

  return (
    <VStack spacing={8} style={{ perspective: "1000px" }}>
      <Center>
        <Heading as="h1" size="2xl" my="4">
          Tic Tac Toe
        </Heading>
      </Center>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} style={{ transform: "rotateX(45deg) rotateZ(0deg)", transformStyle: "preserve-3d" }}>
        {Array(9)
          .fill()
          .map((_, i) => (
            <Cell key={i} num={i} />
          ))}
      </Grid>
      {winner && (
        <Text fontSize="2xl" color="green.500">
          Winner is: {winner}
        </Text>
      )}
      <Button colorScheme="blue" onClick={handleRestart}>
        Restart Game
      </Button>
    </VStack>
  );
};

export default Index;
