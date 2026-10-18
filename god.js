class God{
    constructor(gName,x,y,image,width,height,cardType,godType,domain,description){
        this.greekName = gName;
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.cardType = cardType;
        this.godType = godType;
        this.domain = domain;
        this.description = description;
        this.childLink = new Set();
        this.spouse = [];
        this.childRect = new Set();
        this.rectID = gName+"Rect";
        this.children = [];
    }

    getChineseTranslation(){
        if (typeof translationsZh === "undefined") return null;
        // Handle capitalization differences such as "Muses" vs the "muses" key.
        return translationsZh[this.greekName]
            || translationsZh[this.greekName.charAt(0).toLowerCase()+this.greekName.slice(1)]
            || null;
    }

    clickCard(){
        console.log("clicked");
    }

    // God cards. English remains visible, with Chinese labels added where available.
    view(){
    var picHeight = this.width-20;
    var zh = this.getChineseTranslation();
    var tooltipText = this.greekName+" has "+this.childRect.size+" children.";
    var tooltip = tree.append("svg")
                      .attr("id",this.greekName+"Tooltip")
                      .style("visibility",'hidden');
    tooltip.append("rect")
           .attr("class","tooltipRect")
           .attr("width",this.width+tooltipText.length*6)
           .attr("height",30)
           .attr("godName",this.greekName)
           .attr("x",this.x-tooltipText.length*3)
           .attr("y",this.y-35)
           .attr("rx", 6)
           .attr("ry", 6);
    tooltip.append("text")
           .text(tooltipText)
           .attr("class",'tooltipText')
           .attr("x",this.x+(this.width/2))
           .attr("y",this.y-20);
    tree.append("rect") // add card
        .attr("x",this.x)
        .attr("y",this.y)
        .attr("rx",6)
        .attr("ry",6)
        .attr("godName",this.greekName)
        .attr("id",this.rectID)
        .attr("class",this.godType)
        .attr("width",this.width)
        .attr("height",this.height);

    if(this.cardType === "small"){
        tree.append("text")
            .text(zh ? this.greekName+" · "+zh.name : this.greekName)
            .attr("class","text-"+this.godType+" card-bilingual-small")
            .attr("x",this.x+(this.width/2))
            .attr("y",this.y+(this.height/2)-5);
        tree.append("text")
            .text(this.domain)
            .attr("class","domain-"+this.godType+" domain")
            .attr("id","domain-"+this.greekName)
            .attr("x",this.x+(this.width/2))
            .attr("y",this.y+(this.height/2)+10);
        tree.append("rect")
            .attr("x",this.x-5)
            .attr("y",this.y-5)
            .attr("godName",this.greekName)
            .attr("class","hitbox")
            .attr("domain",this.domain)
            .attr("description",this.description)
            .attr("width",this.width+5)
            .attr("height",this.height+5);
    }else{
        tree.append("svg:image")
            .attr("xlink:href",this.image)
            .attr("x",this.x+10)
            .attr("y",this.y+10)
            .attr("height",picHeight);
        tree.append("text")
            .text(this.greekName)
            .attr("class","text-"+this.godType)
            .attr("x",this.x+(this.width/2))
            .attr("y",this.y+picHeight+27);
        if(zh){
            tree.append("text")
                .text(zh.name)
                .attr("class","zh-card-name")
                .attr("x",this.x+(this.width/2))
                .attr("y",this.y+picHeight+41);
        }
        tree.append("text")
            .text(this.domain)
            .attr("class","domain-"+this.godType+" domain")
            .attr("id","domain-"+this.greekName)
            .attr("x",this.x+(this.width/2))
            .attr("y",this.y+picHeight+(zh ? 56 : 50));
        if(zh && zh.domain){
            tree.append("text")
                .text(zh.domain)
                .attr("class","zh-card-domain")
                .attr("x",this.x+(this.width/2))
                .attr("y",this.y+picHeight+69);
        }
        tree.append("rect")
            .attr("x",this.x-5)
            .attr("y",this.y-5)
            .attr("godName",this.greekName)
            .attr("class","hitbox")
            .attr("domain",this.domain)
            .attr("description",this.description)
            .attr("width",this.width+10)
            .attr("height",this.height+10);
        }
    }
}
