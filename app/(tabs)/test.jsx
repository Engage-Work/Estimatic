import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

//Form
import { CustomButton, FormField } from "../../components";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-0">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  View Your
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Estimate
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* <SearchInput /> */}
            {/* <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            /> */}

            <View className="w-full flex-1 pt-0 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Estimates1
              </Text>

              <View className="bg-gray-800 rounded-lg p-4 mb-4">
                <Text className="text-white font-pmedium mb-2">
                  Repair Details
                </Text>
                <Text className="text-gray-300">
                  Service: Front Bumper Repair
                </Text>
                <Text className="text-gray-300">
                  Vehicle: 2022 Toyota Camry
                </Text>
                <Text className="text-gray-300">
                  Damage: Minor dent and scratches
                </Text>
                <Text className="text-gray-300">Labor Hours: 4</Text>
                <Text className="text-gray-300">Parts Cost: $150</Text>
                <Text className="text-gray-300">Labor Cost: $400</Text>
                <Text className="text-white font-pmedium mt-2">
                  Total Cost: $550
                </Text>
                <Text className="text-gray-300 mt-2">
                  Est. Completion: July 26, 2024
                </Text>
              </View>

              <CustomButton
                title="View Full Estimate"
                handlePress={() => {
                  // Handle viewing full estimate details
                  console.log("Viewing full estimate details");
                }}
                containerStyles="mt-2"
              />
            </View>

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Estimates
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Estimates Found"
            subtitle="No estimates created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
