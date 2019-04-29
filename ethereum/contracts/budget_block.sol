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
    function make_budget(string memory, uint, uint) public returns(bool){}
    function prioritize_budget() public returns(bool){}
    function set_due_date() public returns(bool){}
    function see_progress() public returns(bool){}
    
    event deposited(address user, uint256 amount);
    event progress(string name, uint goal, uint balance);
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
        for (uint n = 1; n <= num_accts; n++) {
            uint diff = accts[n].goal - accts[n].balance;
            // add money if account is not full
            if(diff > 0) {
                if(diff > amt) {
                    // add remainder of deposited amount
                    accts[n].balance += amt;
                    amt = 0;
                }
                else {
                    // add part of deposited amount
                    accts[n].balance += diff;
                    amt -= diff;
                }
            }
        }
        emit deposited(msg.sender, msg.value);
        return true;
    }
    
    function make_budget(string memory name, uint goal, uint priority) public returns(bool){
        
        accts[priority].name = name;
        accts[priority].goal = goal;
        accts[priority].balance = 0;
        num_accts += 1;
        
        return true;
    }
    
    function prioritize_budget() public returns(bool){
        return true;
    }
    
    function set_due_date() public returns(bool){
        return true;
    }
    
    function see_progress() public returns(bool){
        
        for (uint n = 1; n <= num_accts; n++) {
            emit progress(accts[n].name, accts[n].goal, accts[n].balance);
        }
        
        return true;
    }
}
