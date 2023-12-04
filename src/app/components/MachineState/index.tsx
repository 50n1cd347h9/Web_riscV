import styles from "@/app/components/MachineState/memory.module.css"
import { Register, toHex } from "@/app/register"
import { useState } from "react";
import { BITS, BYTES } from "@/app/const"

export const MachineState = ({
	register
}:{
	register: Register
})=>{
  const [tab, setTab] = useState<number>(0);

  const dec2hex = (dec: number) =>{
	  if (dec < 0) {}

	  let hex: string  = dec.toString(16);
	  while (hex.length < 4) {
		  hex = "0" + hex;
	  }
	  return "0x" + hex;
  }

  return (
		<div className={styles.contener}>
			<div className={styles.tabs}>
				<div className={tab===0?styles.selected:styles.noselect} onClick={()=>{if(tab!==0)setTab(0)}}>Register</div>
				<div className={tab===0?styles.noselect:styles.selected} onClick={()=>{if(tab===0)setTab(1)}}>Memory</div>
				{tab === 0 ? <></> :
					<div className={styles.pages}>
						{[...Array<number>(3)].map((v,i)=>(
							<div key={i} onClick={()=>{if(tab!==i+1)setTab(i+1)}} className={tab===i+1?styles.selected:styles.noselect}>{i+1}</div>
						))}
					</div>
				}
			</div>
			<div className={styles.registers}>
				{[...Array<number>(2)].map((v, i) => (
					<div key={i} className={styles.memories}>
						{[...Array<number>(16)].map((v, j)=>{
							let name: string;
							let address: number;
							let value: number;
							let isChanged: boolean = false;

							const k = j + i * 16;

							for (let l = 0; l < register.delta.length; ++l) {
								if ((k+tab*32) === register.delta[l]) {
									console.log(`k:${k}`);
									isChanged = true;
									break;
								}
							}

							if (tab === 0) {
								name = register.reg_names[k].name;
								value = register.reg_names[k].value;
							} else {
								address = dec2hex(k * BYTES + 128 * (tab - 1));
								value = 1024 * tab + k * BITS;
							}
							return (
								<div key={address} className={`${styles.memory} ${isChanged?styles.changed:''}`}>
								 	{tab == 0 ? 
										<p>{name}</p> :
										<p>{address}</p>
									}
									<p>0x{toHex(register, value, 32)}</p>
								</div>
							)
						})}
					</div>
				))}
			</div>
		</div>
	)
}
