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
        uint amt = msg.value;
        // iterate over accounts in priority order
        for (uint n = 1; n < num_accts; n++) {
            uint diff = accts[n].goal - accts[n].balance;
            // add money if account is not full
            if(diff > 0) {
                // add remainder of deposited amount
                if(diff > amt) {
                    accts[n].balance += amt;
                    amt = 0;
                }
                // add part of deposited amount
                else {
                    accts[n].balance += diff;
                    amt -= diff;
                }
            }
        }
        emit deposited(msg.sender, msg.value);
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
