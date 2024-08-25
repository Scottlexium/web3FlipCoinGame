// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlipGame {
    event GameStarted(uint256 bet);
    event BetPlaced(address indexed player, uint8 bet);
    event FlipResult(uint8 outcome);
    event PlayerWins(address indexed player, uint256 amount);
    event OperatorWins(address indexed operator, uint256 amount);

    enum State {
        WAITING_BET,
        WAITING_FLIP,
        GAME_OVER
    }

    address public operator;
    address public player;
    State public state;
    uint256 public bet;
    uint8 public playerBet;
    uint256 public operatorBalance;
    bool private locked;
    string public author = "Scott Lexium";

    modifier onlyOperator() {
        require(msg.sender == operator, "Only operator can call this function");
        _;
    }

    modifier inState(State expected) {
        require(state == expected, "Invalid state");
        _;
    }

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }

    constructor(uint256 _bet) {
        require(_bet > 0, "Bet must be greater than 0");
        operator = msg.sender;
        state = State.WAITING_BET;
        bet = _bet;
        emit GameStarted(bet);
    }

    function depositOperatorFunds() public payable onlyOperator {
        operatorBalance += msg.value;
    }

    function withdrawOperatorFunds(
        uint256 amount
    ) public onlyOperator noReentrant {
        require(amount <= operatorBalance, "Insufficient funds");
        operatorBalance -= amount;
        payable(operator).transfer(amount);
    }

    function placeBet(uint8 _bet) public payable inState(State.WAITING_BET) {
        require(_bet == 0 || _bet == 1, "Invalid bet");
        require(msg.value == bet, "Incorrect bet amount");
        require(operatorBalance >= bet, "Insufficient operator funds");

        playerBet = _bet;
        player = msg.sender;
        state = State.WAITING_FLIP;
        emit BetPlaced(player, playerBet);
    }

    function flipAndSettle()
        public
        onlyOperator
        inState(State.WAITING_FLIP)
        noReentrant
    {
        uint8 flipOutcome = uint8(
            uint256(
                keccak256(abi.encodePacked(block.timestamp, block.prevrandao))
            ) % 2
        );
        emit FlipResult(flipOutcome);

        if (flipOutcome == playerBet) {
            uint256 winAmount = bet * 2;
            operatorBalance -= bet;
            payable(player).transfer(winAmount);
            emit PlayerWins(player, winAmount);
        } else {
            operatorBalance += bet;
            emit OperatorWins(operator, bet);
        }

        resetGame();
    }

    function resetGame() private {
        state = State.WAITING_BET;
        player = address(0);
        playerBet = 0;
    }

    function getOperatorBalance() public view returns (uint256) {
        return operatorBalance;
    }
}
