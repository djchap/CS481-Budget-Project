pragma solidity ^0.5.7;

contract Budget {
    
    address internal savings;
    uint256 public start;
    uint256 public end;
    
    struct Account {
        string name;
        uint goal;
        uint balance;
    }
    
    mapping(uint => Account) public accts;
    uint num_accts = 0;

    enum budget_state {
        STARTED
    }
    
    budget_state public STATE;
    
    function deposit() public payable returns(bool){}
    function make_budget() public returns(bool){}
    function prioritize_budget() public returns(bool){}
    function set_due_date() public returns(bool){}
    function see_progress() public view returns(uint){}
    
    event deposited(address user, uint256 amount);
}

contract MyBudget is Budget {
    
    constructor () public {
        start = now;
        end = start + 30 days;
        STATE=budget_state.STARTED;
    }
    
    function deposit() public payable returns(bool){
        return true;
    }
    
    function make_budget() public returns(bool){
        return true;
    }
    
    function prioritize_budget() public returns(bool){
        return true;
    }
    
    function set_due_date() public returns(bool){
        return true;
    }
    
    function see_progress() public view returns(uint){
        return 0;
    }
}
