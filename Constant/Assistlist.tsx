interface Response {
    InternalTrigger: string; 
    Response: string; 
    Display: string;
  };
  
export interface AssistanceResponse {
  [key: string]: Response; 
}

export const Assistresponse:AssistanceResponse = {
  โรคหัวใจคืออะไร:{
    Response:"ยังไม่ได้คิด!",
    InternalTrigger: "valid",
    Display: "hello"
  },
  โรคหัวใจมีสาเหตุจากอะไร:{
    Response:"ยังไม่ได้คิด!",
    InternalTrigger: "invalid",
    Display: "bye!"
  },
}

export const giveresponse = (triggeresponse:string) => {
  let result
  for (let [key, value] of Object.entries(Assistresponse)){
    if (Object.values(value).includes(triggeresponse)){
      result = value.Response
    }else{

    };
  };
  console.log(result);
  return result;
}