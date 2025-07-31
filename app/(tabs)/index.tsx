import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Multi3DViewer from '@/components/Multi3DViewer';

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
      <View style={styles.mainContainer}>
        {/* Top half - 3D GLB Models */}
        <View style={styles.topHalf}>
          <Multi3DViewer
            models={[
              'https://cdn.builder.io/o/assets%2F2cc8e052980a46afac6d7681a3037898%2F43ec210a415e4b21b85cfc287f34271c?alt=media&token=0b5eab0b-deb8-4602-b15e-3ee7979ec47a&apiKey=2cc8e052980a46afac6d7681a3037898',
              'https://cdn.builder.io/o/assets%2F2cc8e052980a46afac6d7681a3037898%2Fd0376ace123c4a319ad4d95f4fff9ce9?alt=media&token=a356a70b-7927-456f-a2a3-8123896ec4ca&apiKey=2cc8e052980a46afac6d7681a3037898',
              'https://cdn.builder.io/o/assets%2F2cc8e052980a46afac6d7681a3037898%2F851d685b8b7546c9a050aba2be522354?alt=media&token=cad117b4-680b-4a9e-ac17-d116d6cd552c&apiKey=2cc8e052980a46afac6d7681a3037898',
              'https://cdn.builder.io/o/assets%2F2cc8e052980a46afac6d7681a3037898%2Feb234d941a9547d0990faba6aee0c870?alt=media&token=8be89704-ec80-46dd-a611-4d30beb53e08&apiKey=2cc8e052980a46afac6d7681a3037898'
            ]}
            style={styles.primaryModel}
          />

          {/* SSR Badge positioned over the 3D model */}
          <SSRBadge />
        </View>

        {/* Bottom half - UI Content */}
        <View style={styles.bottomHalf}>
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

          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mainContainer: {
    flex: 1,
  },
  topHalf: {
    height: screenHeight * 0.5,
    backgroundColor: 'rgba(20, 20, 25, 0.95)',
    position: 'relative',
  },
  primaryModel: {
    flex: 1,
  },
  bottomHalf: {
    height: screenHeight * 0.5,
    backgroundColor: 'rgba(10, 10, 15, 0.8)',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    paddingBottom: 20,
    paddingTop: 10,
  },
  header: {
    backgroundColor: '#191919',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    color: '#E8DD9F',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'System',
  },
  mainPanel: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  skillContainer: {
    alignItems: 'center',
    width: 72,
  },
  skillIcon: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden',
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
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillInner: {
    width: 35,
    height: 35,
    backgroundColor: 'rgba(106, 109, 113, 0.8)',
    borderRadius: 17.5,
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
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(94, 95, 98, 0.9)',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 4,
    minHeight: 20,
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
    top: 20,
    left: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FF3E13',
    shadowColor: '#FE6824',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 1,
    zIndex: 10,
  },
  ssrGradient: {
    flex: 1,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ssrText: {
    color: '#FE6824',
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: '#FFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
  },
});
