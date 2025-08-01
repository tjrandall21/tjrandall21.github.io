
let randomizeButtonSize;
let randomizeButtonPosition;
let randomizeButton;

let shopPosition;
let shopEntryHeight;
let titleText;

let shopEntries;
let shopSize;
let currentShop;
let input;
let chosenIndexes;

class ShopEntry
{
    constructor(name,cost,effect,category,notes="")
    {
        this.name = name;
        this.cost = cost;
        this.effect = effect;
        this.category = category;
        this.notes = notes;
    }
    displayInShop(y)
    {
        if(y>=5)
        {
            y+=0.5;
        }
        textSize(20);
        if(this.category == "Spend Points")
        {
            fill("orange");
        }
        else if(this.category == "Gain Points")
        {
            fill("green");
        }
        else if(this.category == "Bargain")
        {
            fill("yellow");
        }
        else if(this.category == "Sacrifice")
        {
            fill("red");
        }
        else if(this.category == "Banned Abilities")
        {
            fill("Magenta");
        }
        else if(this.category == "Advantage")
        {
            fill("cyan");
        }
        text(this.name + ':',shopPosition.x,shopPosition.y+(y*shopEntryHeight))
        var displayString = this.effect;
        
        fill(230);
        textSize(16);
        text(this.effect, shopPosition.x,shopPosition.y+shopEntryHeight/3+(y*shopEntryHeight));
        if (this.notes != "")
        {
            textSize(14);
            text("("+this.notes+')', shopPosition.x,shopPosition.y-4+2*shopEntryHeight/3+(y*shopEntryHeight));
        }
        
    }
}

function setup() 
{
    randomizeButtonSize = createVector(Math.min(250, 2*windowWidth/3),Math.min(75,windowHeight/6));
    randomizeButtonPosition = createVector((windowWidth-randomizeButtonSize.x/2 - 25)-(randomizeButtonSize.x/2),windowHeight*7/8);
    randomizeButton = createButton("Randomize");
    randomizeButton.mouseClicked(randomizeAll);
    randomizeButton.size(randomizeButtonSize.x,randomizeButtonSize.y);
    randomizeButton.position(randomizeButtonPosition.x,randomizeButtonPosition.y);

    input = createInput('');
    input.position(randomizeButtonPosition.x,randomizeButtonPosition.y-25)

    shopPosition = createVector(25,115);
    shopEntryHeight = 60;
    titleText ="Super Secret Sploob Shop";
    createCanvas(windowWidth, windowHeight);
    background(35);
    shopSize = 6;
    initShopEntries();
    randomizeAll();
}

function draw() 
{
    background(35);
    fill(255)
    textSize(50)
    text(titleText,(windowWidth/2)-300,75);
    drawShop();
    drawLegend();
}

function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight); // Resizes canvas to new window dimensions
    randomizeButtonSize = createVector(Math.min(250, 2*windowWidth/3),Math.min(75,windowHeight/6));
    randomizeButtonPosition = createVector((windowWidth-randomizeButtonSize.x/2 - 25)-(randomizeButtonSize.x/2),windowHeight*7/8);
    randomizeButton.size(randomizeButtonSize.x,randomizeButtonSize.y);
    randomizeButton.position(randomizeButtonPosition.x,randomizeButtonPosition.y);
    input.position(randomizeButtonPosition.x,randomizeButtonPosition.y-25)
}

function randomizeAll()
{
    if (input.value() == "")
    {
        currentShop = [];
        currentShop.push(new ShopEntry("Flash Sale","-25%","-25% Discount on "+getRandomTypeCombo()+" Pokemon", "Bargain", "Always available but the type combo changes"));
        currentShop.push(new ShopEntry("Tradeless","","Gain 1 Point, but have 1 less maximum trades","Gain Points","Max 5 times per person, always available"));
        currentShop.push(new ShopEntry("One Trick Pony","","Gain 1 Point, and choose a pokemon on your draft to be limited to only one ability slot","Gain Points","Max 5 times per person, trading away the affected pokemon loses the additional point, always available"));
        currentShop.push(new ShopEntry("Gambling Sponsorship","","Gain 2 Points, and spin the wheel for yourself before picking this round","Gain Points","Max once per shop round, and twice per person, always available"));
        currentShop.push(new ShopEntry("Ban","1","Spend 1 Point to Ban any unchosen Pokemon","Spend Points","Max once per shop round, always available"));
        chosenIndexes = [];
        let range = []
        for (let i = 0; i < shopEntries.length; i++) 
        {
            range.push(i);
        }
        for (let i = 0; i < shopSize; i++) 
        {
            let newIndex = random(range);
            while((chosenIndexes.includes(newIndex,0)))
            {
                newIndex = random(range);
            }
            chosenIndexes.push(newIndex);
            const newEntry = shopEntries[newIndex];
            currentShop.push(newEntry);
        }
    }
    else if(input.value() == "type" || input.value() == "Type")
    {
        currentShop[0] = new ShopEntry("Flash Sale","-25%","-25% Discount on "+getRandomTypeCombo()+" Pokemon", "Bargain", "Always available but the type combo changes");
    }
    else if(chosenIndexes.length != shopEntries.length &&(input.value() == '1' ||input.value() == '2' ||input.value() == '3' ||input.value() == '4' ||input.value() == '5' ||input.value() == '6'))
    {
        var index = parseInt(input.value())+4;
        let range = []
        for (let i = 0; i < shopEntries.length; i++) 
        {
            range.push(i);
        }
        let newIndex = random(range);
        while((chosenIndexes.includes(newIndex,0)))
        {
            newIndex = random(range);
        }
        chosenIndexes.push(newIndex);
        currentShop[index] = shopEntries[newIndex];
    }
    
}
function randomizeType()
{
    currentShop[0] = new ShopEntry("Flash Sale","-25%","Discount on "+getRandomTypeCombo()+" Pokemon", "Bargain", "Always available but the type combo changes");
}

function drawShop()
{
    for (let i = 0; i < currentShop.length; i++) 
    {
        currentShop[i].displayInShop(i);
    }
}

function drawLegend()
{
    if (windowWidth > 1200)
    {
        const X = windowWidth-550;
        const buffer = 35;
        var startHeight = shopPosition.y;
        fill("yellow");
        textSize(16);
        text("Yellow = Bargains",X,startHeight);
        textSize(14);
        fill(230);
        text("Get discounts on your current pick",X,startHeight+buffer/2);
        
        fill("green");
        textSize(16);
        text("Green = Gain Points",X,startHeight+buffer);
        textSize(14);
        fill(230);
        text("Accept various limitations or risks to gain points",X,startHeight+buffer*1.5);
        
        fill("orange");
        textSize(16);
        text("Orange = Spend Points",X,startHeight+buffer*2);
        textSize(14);
        fill(230);
        text("Spend points to gain various benefits",X,startHeight+buffer*2.5);
        
        fill("red");
        textSize(16);
        text("Red = Sacrifice",X,startHeight+buffer*3);
        textSize(14);
        fill(230);
        text("Remove pokemon from your team to gain benefits. They can never return to your team",X,startHeight+buffer*3.5);
        
        fill("magenta");
        textSize(16);
        text("Purple = Banned Abilites",X,startHeight+buffer*4);
        textSize(14);
        fill(230);
        text("Unlock banned abilities for yourself, but with limitations",X,startHeight+buffer*4.5);
        
        fill("cyan");
        textSize(16);
        text("Blue = Advantages",X,startHeight+buffer*5);
        textSize(14);
        fill(230);
        text("Gain Advantages that you can use a limited number of times during the battle phase.",X,startHeight+buffer*5.5);
    }
}

function getRandomTypeCombo(singleType = false)
{
    var types = ["Fire","Water","Grass","Electric","Normal","Flying","Ground","Bug","Rock","Fighting","Dark","Psychic","Ghost","Steel","Dragon","Fairy","Ice","Poison"];
    var type1 = random(types);
    if (singleType || random() < 0.25)
    {
        return "Pure "+type1;
    }
    let type2;
    do 
    {
        type2 = random(types);
    } while (type2 == type1);

    return type1 + '/' + type2;
}

function initShopEntries()
{
    shopEntries = [];
    //Gain Points
    shopEntries.push(new ShopEntry("Random Battle","","Gain 5 points, and pick from a random battle this round","Gain Points","Trading this pokemon away will result in losing the 5 points gained from it")); 
    shopEntries.push(new ShopEntry("Aura Farming","","Gain half the point value of your first Pokemon but you can't use it or remove it from your draft until playoffs","Gain Points"));
    shopEntries.push(new ShopEntry("It Pays to be Bad","","Make an open offer to trade your entire draft up to this point with anyone else. If nobody takes it, you gain 5 points.","Gain Points","The offer stands until everyone has had at least 1 pick"));
    //Spend Points
    shopEntries.push(new ShopEntry("Awakened Potential","3","Spend 3 points to add a third ability slot to one of your pokemon","Spend Points","Max once per player, trading away the pokemon refunds the points"));
    shopEntries.push(new ShopEntry("I Want That Too","+33%","Choose a pokemon that's already taken but pay 33% more.","Spend Points","This is a duplicate, not a steal"));
    //Bargains
    shopEntries.push(new ShopEntry("Sale on Appliances","-2","-2 point discount on Rotom Forms", "Bargain"));
    shopEntries.push(new ShopEntry("Clearance","-18","-18 point discount on Terapagos", "Bargain"));
    shopEntries.push(new ShopEntry("White Knight","-50%","Your pick this round is half price but can only be male and run Rivalry", "Bargain", "Limited to pokemon that can be male"));
    shopEntries.push(new ShopEntry("Performance Contract","-50%","Your pick this round is half price but if it ever goes a single week without getting a kill it is removed from your team and the points are not refunded.", "Bargain"));
    //Sacrifices
    shopEntries.push(new ShopEntry("Casino Field Trip","","Sacrifice and repick any pokemon you have drafted, there will be a wheel spin that affects all players at the beginning of the next round", "Sacrifice"));
    shopEntries.push(new ShopEntry("Take One for the Team","","Sacrifice your first pokemon and repick, then gain 5 points", "Sacrifice"));
    shopEntries.push(new ShopEntry("I'd Kill for a Pony For Christmas","","Sacrifice a Rock type, a Steel type, and a Grass type totalling at least 25 points and do not regain their point values, then receive Keldeo", "Sacrifice"));
    shopEntries.push(new ShopEntry("Bloody Robbery","","Sacrifice pokemon from your team totalling at least 20 points and do not regain their point values, then steal a single pokemon from any other player", "Sacrifice","Repick until you have as many pokemon as you started with, the other player will regain points and repick"));
    
    //Advantages
    shopEntries.push(new ShopEntry("Risky Mitigation","5","Spend 5 points, then up to three times, at the start of a week, you may replace a single ability on your opponent's team with Illusion", "Advantage"));
    shopEntries.push(new ShopEntry("Turn The Tables","8","Spend 8 points, then one time, at the start of a week, you may swap teams with your opponent for that battle", "Advantage", "cannot be used in playoffs"));
    shopEntries.push(new ShopEntry("The Gay Agenda","1","Spend 1 point, then up to three times, at the start of a week, you may force all your opponents pokemon to be the same gender", "Advantage", "You may choose which gender, can be avoided by genderless or gender-locked pokemon"));
    shopEntries.push(new ShopEntry("Clutch Factor","5","Spend 5 points, then up to two times, when about to enter a game 3, you may change the ability of a single pokemon on your team before finishing the set", "Advantage"));
    
    //Banned Abilities
    shopEntries.push(new ShopEntry("Reburden","-2","Spend 2 points to legalize Unburden for yourself, but Pokemon with it can only hold air balloon", "Banned Abilities"));
    shopEntries.push(new ShopEntry("Baby Bouncer","-3","Spend 3 points to legalize Magic Bounce for yourself, but it can only be used on baby pokemon", "Banned Abilities"));
    shopEntries.push(new ShopEntry("Baby Bruiser","-5","Spend 5 points to legalize Huge Power for yourself but it can only be used on pokemon with 40 or less base attack", "Banned Abilities"));
    shopEntries.push(new ShopEntry("Sleeper Pick","-2","Spend 2 points to legalize Comatose for yourself but Pokemon with it cannot use phase moves", "Banned Abilities","a phase move is any move that forces the opponent to switch out"));
}