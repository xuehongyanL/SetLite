var DataFrame=function(cols){
    if(!cols) throw new Error('No columns found');
    this.columns=cols;
    this.length=0;
    this.values={};
    for(col of this.columns){
        this.values[col]=[];
    }
    this.add=function(record){
        for(col of this.columns) this.values[col].push(record[col]);
        this.length++;
    }
    this.drop=function(idx){
        for(col of this.columns) this.values[col].splice(idx,1);
        this.length--;
    }
    this.get=function(col){
        return this.values[col];
    }
    this.loc=function(idx){
        dat={};
        for(col of this.columns){
            dat[col]=this.values[col][idx];
        }
        return dat;
    }
    this.add_index=function(col){
        if(this.columns.includes(col)) throw new Error('Columns name exists');
        this.columns.push(col);
        this.values[col]=Array(this.length);
    }
    this.remove_index=function(col){
        this.columns.splice(this.columns.indexOf(col),1);
        delete this.values[col];
    }
    this.to_array=function(){
        let self=this;
        return Array(this.length).fill(null).map(
            function(value,index){
                dat=[];
                for(col of self.columns) dat.push(self.values[col][index]);
                return dat;
            }
        );
    }
    this.to_record=function(){
        let self=this;
        return Array(this.length).fill(null).map((value,index)=>self.loc(index));
    }
    this.to_csv=function(){
        return this.to_array().map((value,index)=>value.join()).join('\r\n');
    }
}
module.exports.DataFrame=DataFrame;
