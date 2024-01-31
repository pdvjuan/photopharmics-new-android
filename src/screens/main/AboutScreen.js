import React from "react";
import { View, Text, Linking,TouchableOpacity } from "react-native";
import { tw } from "tailwind";
import PageContainer from "../PageContainer";


const AboutScreen = () => {
  // Assuming these are your contact details
  const phoneNumber = '1-888-509-7047';
  const email = 'LIGHT-PD.CelesteSupport@chet.rochester.edu';

  // Function to handle phone number link
  const handlePhonePress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // Function to handle email link
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <PageContainer>
  <View style={tw("bg-white pt-5 px-4 shadow")}>
  <View style={tw("justify-center items-center")}>
    <Text style={tw("text-celeste-darkgray text-xl font-bold text-center")}>
       Questions or Concerns? Contact a Celeste Device Technician.
    </Text>
  </View>
  <View style={tw("py-2")}>
    <TouchableOpacity onPress={handlePhonePress}>
    <View
      style={tw(
        "flex flex-row justify-between items-center border-b border-gray-200 py-2"
      )}
    >
      <View style={tw("flex flex-row items-center")}>

        <Text style={tw("text-gray-500 text-lg mx-2")}>Phone Number</Text>
      </View>
      <View>
        <Text style={tw("text-celeste-blue text-lg")}>{phoneNumber}</Text>
      </View>
    </View>

    </TouchableOpacity>

    <TouchableOpacity onPress={handleEmailPress}>
    <View
      style={tw(
        "flex flex-row justify-between items-center border-b border-gray-200 py-2"
      )}
    >
      <View style={tw("flex flex-row items-center")}>
        <Text style={tw("text-gray-500 text-lg mx-2")}>Tap for email</Text>
      </View>
      
    </View>
      </TouchableOpacity>

      <View
      style={tw(
        "flex flex-row justify-between items-center border-b border-gray-200 py-2"
      )}
    >
      <View>
        <Text selectable={true} style={tw("text-celeste-blue text-lg")}>{email}</Text>
      </View>
    </View>

    <View style={{flexDirection:'row', paddingBottom:10, justifyContent:'space-between'}}>
    </View> 
  </View>
</View>
</PageContainer>
  );
};

export default AboutScreen;


//OLD \/ \/


// const AboutScreen = () => {
//   const { data: faqs, isLoading, isError } = usePostsQuery("faq");

//   if (isLoading)
//     return (
//       <PageContainer>
//         <View style={tw("py-4")}>
//           <ActivityIndicator size="large" color="gray" />
//         </View>
//       </PageContainer>
//     );
//   if (isError)
//     return (
//       <PageContainer>
//       <View style={tw("py-4")}>
//         <Text>Error in retrieving FAQs</Text>
//       </View>
//       </PageContainer>
//     );
//   return (
//     <PageContainer style={tw("flex-1 justify-center")}>
//       <FlatList
//         data={faqs}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <AccordionListItem title={item.acf.question}>
//              {/* <AccordionListItem title={item.title.rendered}> */}
//             <Text style={tw("font-nunito-400 text-base")}>
//               {item.acf.answer}
//               {/* {item.content.rendered} */}
//             </Text>
//           </AccordionListItem>
//         )}
//       />
//     </PageContainer>
//   );
// };

// export default AboutScreen;
