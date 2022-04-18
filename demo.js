<Grid item xs={2} md={2}>
<Button variant="contained" color="primary" onClick={()=>setOpen(true)}>
New Neighborhoods
</Button><br/><br/>

{/* get list of neightbourhoods */}
     {docs.map((item, index) => (
      <Accordion
        key={item.id}
        expanded={controlled === item.id}
        onChange={handleChangeControlled(item)}
      >
        <AccordionSummary >
        <Button variant="contained" style={{width:"100%"}} color={item && neighbourhood && item.id === neighbourhood.id ? "primary" : "inherit"} >
        {item.neighbourhood}
        </Button>
     
        </AccordionSummary>

    {/* get list of precinct based on neighbourhood id */}
        {precinctList &&  precinctList.length === 0 ? <Typography variant='body1'>Collecting data</Typography> :  precinctList.map((precinct_, index)=>(
        <Accordion
        key={precinct_.id}
        expanded={precinctcontrolled === precinct_.id}
        onChange={handlePrecinctChangeControlled(precinct_)}
      >
       <AccordionSummary >
       <Button variant="contained" style={{width:"100%", marginLeft:20}} color={precinct && precinct_.id === precinct.id ? "secondary" : "inherit"} >
        {precinct_.precint}
        </Button>
     
        
        </AccordionSummary>
     
            {/* get list of blicks based on Precinct id */}
        {blockList && blockList.length === 0 ? <Typography variant='body1'>Collecting Data</Typography>  :  blockList.map((block_, index)=>(
        <Accordion
        key={block_.id}
        expanded={blockcontrolled === block_.id}
        onChange={handleBlockChangeControlled(block_)}
      >
        <AccordionSummary >
        <Button variant="contained" style={{width:"100%", marginLeft:40}} color={blockId && block_.id === blockId.id ? "warning" : "inherit"} >
        {block_.block}
        </Button>
        
        </AccordionSummary>
     
      </Accordion>
      ))} 

      </Accordion>
      ))} 

      </Accordion>
    ))}
  </Grid>