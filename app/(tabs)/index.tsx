import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Star Rating Component
const StarRating = () => {
  return (
    <View style={styles.starContainer}>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.star}>
          <Text style={styles.starText}>★</Text>
        </View>
      ))}
    </View>
  );
};

// Skill Icon Component
const SkillIcon = ({ 
  name, 
  isActive = false, 
  hasNew = false 
}: { 
  name: string; 
  isActive?: boolean; 
  hasNew?: boolean; 
}) => {
  return (
    <View style={styles.skillContainer}>
      <View style={[styles.skillIcon, isActive && styles.skillIconActive]}>
        <LinearGradient
          colors={isActive ? ['#FFF6E3', '#FFEDD2'] : ['#FFF6E3', '#FFEDD2']}
          style={styles.skillGradient}
        >
          <View style={styles.skillInner} />
        </LinearGradient>
        {hasNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>!</Text>
          </View>
        )}
      </View>
      <Text style={styles.skillName}>{name}</Text>
    </View>
  );
};

// Progress Bar Component
const ProgressBar = ({ 
  label, 
  value, 
  maxValue 
}: { 
  label: string; 
  value: number; 
  maxValue: number; 
}) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <View style={styles.progressLabel}>
          <View style={styles.technologyIcon} />
          <Text style={styles.progressLabelText}>{label}</Text>
        </View>
        <Text style={styles.progressValue}>{value.toLocaleString()}</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${Math.min(percentage, 100)}%` }]} />
      </View>
    </View>
  );
};

// Divider Component
const Divider = () => {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerDot} />
      <View style={styles.dividerLine} />
      <View style={styles.dividerDot} />
      <View style={styles.dividerDot} />
      <View style={styles.dividerLine} />
      <View style={styles.dividerDot} />
    </View>
  );
};

// Action Button Component
const ActionButton = ({ 
  title, 
  multiplier, 
  isSecondary = false 
}: { 
  title: string; 
  multiplier: string; 
  isSecondary?: boolean; 
}) => {
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.multiplierBadge}>
        <LinearGradient
          colors={['#A68763', 'rgba(226, 209, 183, 0)']}
          style={styles.multiplierGradient}
        >
          <Text style={styles.multiplierText}>{multiplier}</Text>
        </LinearGradient>
      </View>
      <TouchableOpacity style={[styles.actionButton, isSecondary && styles.actionButtonSecondary]}>
        <LinearGradient
          colors={isSecondary ? ['rgba(26, 27, 31, 0)', '#94805D'] : ['#A68763', '#A68763']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

// SSR Badge Component
const SSRBadge = () => {
  return (
    <View style={styles.ssrBadge}>
      <LinearGradient
        colors={['#791600', '#FF3E13']}
        style={styles.ssrGradient}
      >
        <Text style={styles.ssrText}>SSR</Text>
      </LinearGradient>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        {/* Background creature image */}
        <Image
          source="https://cdn.builder.io/api/v1/image/assets%2F2cc8e052980a46afac6d7681a3037898%2F508b8285dfa04c7489996057b9eb9826?format=webp&width=800"
          style={styles.backgroundImage}
          contentFit="cover"
        />

        {/* Main content overlay */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Main Content Container */}
          <View style={styles.contentContainer}>
            
            {/* Special Build Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>SPECIAL BUILD</Text>
            </View>

            {/* Main Content Panel */}
            <LinearGradient
              colors={['rgba(53, 54, 56, 0.9)', 'rgba(53, 54, 56, 0.9)']}
              style={styles.mainPanel}
            >
              {/* Star Rating */}
              <StarRating />
              
              <Divider />

              {/* High Archives Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>HIGH ARCHIVES</Text>
                <Text style={styles.sectionDescription}>
                  Allows you to summon and mount a{' '}
                  <Text style={styles.highlight}>Humanoid Mech,</Text>
                  {' '}which greatly increases your{' '}
                  <Text style={styles.highlight}>Speed, ATT, DEF,</Text>
                  {' '}and the range of your downward jumps. When attacked, you cannot be knocked back.
                </Text>
              </View>

              <Divider />

              {/* Skills Section */}
              <View style={styles.skillsSection}>
                <SkillIcon name="NEBULA" isActive={true} />
                <SkillIcon name="PLASMA SURGE" hasNew={true} />
                <SkillIcon name="SOLAR FLARE" />
                <SkillIcon name="VOID PULSE" hasNew={true} />
              </View>

              {/* Heart of Valkyrie Section */}
              <View style={styles.heartSection}>
                <View style={styles.heartLeft}>
                  <SkillIcon name="FOCUS FIRE" hasNew={true} />
                </View>
                <View style={styles.heartRight}>
                  <Text style={styles.heartTitle}>HEART OF VALKYRIE</Text>
                  <ProgressBar label="Technology" value={4366} maxValue={5000} />
                  <ProgressBar label="Technology" value={283} maxValue={1000} />
                </View>
              </View>

              <Divider />

              {/* Action Buttons */}
              <View style={styles.buttonsSection}>
                <ActionButton title="SUMMON" multiplier="X1" />
                <ActionButton title="SUMMON X10" multiplier="X10" isSecondary={true} />
              </View>
            </LinearGradient>
          </View>

          {/* SSR Badge positioned over the creature */}
          <SSRBadge />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundContainer: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#191919',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  headerText: {
    color: '#E8DD9F',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'System',
  },
  mainPanel: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 0,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  star: {
    marginHorizontal: 2,
  },
  starText: {
    color: '#FFBB0B',
    fontSize: 24,
    textShadowColor: '#FFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  dividerDot: {
    width: 2,
    height: 2,
    backgroundColor: '#FFF',
    borderRadius: 1,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#494B4D',
    marginHorizontal: 3,
  },
  section: {
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    color: '#E8DD9F',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    textAlign: 'center',
  },
  sectionDescription: {
    color: '#FFF',
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  highlight: {
    color: '#E8DD9F',
  },
  skillsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  skillContainer: {
    alignItems: 'center',
    width: 72,
  },
  skillIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 8,
    position: 'relative',
  },
  skillIconActive: {
    borderColor: '#97662C',
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: -7 },
    shadowRadius: 8.2,
    shadowOpacity: 0.43,
  },
  skillGradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillInner: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(106, 109, 113, 0.7)',
    borderRadius: 15,
  },
  newBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 15,
    height: 15,
    backgroundColor: '#FFBB0B',
    borderRadius: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#FFF',
  },
  newBadgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  skillName: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(94, 95, 98, 0.8)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
  },
  heartSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    gap: 15,
  },
  heartLeft: {
    alignItems: 'center',
  },
  heartRight: {
    flex: 1,
  },
  heartTitle: {
    color: '#E8DD9F',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 10,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  technologyIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  progressLabelText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  progressValue: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#2A2A2C',
    borderRadius: 2,
  },
  progressBarFill: {
    height: 4,
    backgroundColor: '#FFCB7C',
    borderRadius: 2,
  },
  buttonsSection: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 15,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  multiplierBadge: {
    marginBottom: 5,
  },
  multiplierGradient: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 0,
  },
  multiplierText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  actionButton: {
    width: '100%',
    borderRadius: 0,
  },
  actionButtonSecondary: {
    borderBottomWidth: 2,
    borderBottomColor: '#E8DD9F',
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  ssrBadge: {
    position: 'absolute',
    top: screenHeight * 0.15,
    left: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FF3E13',
    shadowColor: '#FE6824',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  ssrGradient: {
    flex: 1,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ssrText: {
    color: '#FE6824',
    fontSize: 24,
    fontWeight: '900',
    textShadowColor: '#FFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
