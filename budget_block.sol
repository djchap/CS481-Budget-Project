pragma solidity ^0.4.21;

contract Budget {
    
    address internal savings;
    uint256 public start;
    uint256 public end;
    
    string[] names;
    
    mapping(string => uint) values;
    mapping(string => uint) priorities;
    
    enum budget_state {
        STARTED
    }
    
    budget_state public STATE;
    
    function deposit() public payable returns(bool){}
    function make_budget() public returns(bool){}
    function prioritize_budget() public returns(bool){}
    function set_due_date() public returns(bool){}
    function see_progress() public view returns(bool){}
}

contract MyBudget is Budget {
    
    constructor () public {
        start = now;
        end = start + 30 days;
        STATE=budget_state.STARTED;
    }
    
}
